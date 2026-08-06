/**
 * THE BRACES & CROWNS - Shared Form Validation & AJAX Submission
 * Powers both the Contact / Appointment Booking form and the
 * Book Consultation popup with identical validation rules and the
 * same server endpoint (contact_validate.php).
 */

(function () {
  'use strict';

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function todayISO() {
    var d = new Date();
    var tzOffsetMs = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffsetMs).toISOString().slice(0, 10);
  }

  var VALIDATORS = {
    name: function (value) {
      return value.trim().length >= 3 ? '' : 'Please enter your full name (at least 3 characters).';
    },
    email: function (value) {
      return EMAIL_PATTERN.test(value.trim()) ? '' : 'Please enter a valid email address.';
    },
    phone: function (value) {
      var digits = value.trim();
      if (!/^\d+$/.test(digits)) return 'Phone number must contain digits only.';
      if (digits.length < 10 || digits.length > 15) return 'Phone number must be 10–15 digits.';
      return '';
    },
    treatment: function (value) {
      return value ? '' : 'Please select a treatment area.';
    },
    date: function (value) {
      if (!value) return 'Please select a preferred date.';
      return value < todayISO() ? 'Please choose a date from today onward.' : '';
    },
    time: function (value) {
      return value ? '' : 'Please select a preferred time.';
    },
    notes: function (value) {
      return value.length > 500 ? 'Notes must be under 500 characters.' : '';
    }
  };

  function setFieldError(input, message) {
    var errorEl = document.getElementById(input.id + '-error');
    if (errorEl) errorEl.textContent = message || '';
    input.classList.toggle('is-invalid', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');

    var wrapper = input.closest('.ab-field');
    if (wrapper) wrapper.classList.toggle('is-invalid', Boolean(message));
  }

  function initBookingForm(options) {
    var form = document.getElementById(options.formId);
    if (!form) return;

    var fields = {};
    Object.keys(options.fields).forEach(function (key) {
      var input = document.getElementById(options.fields[key]);
      if (input) fields[key] = input;
    });

    var successEl = options.successId ? document.getElementById(options.successId) : null;
    var errorBanner = options.errorBannerId ? document.getElementById(options.errorBannerId) : null;
    var honeypot = options.honeypotId ? document.getElementById(options.honeypotId) : null;
    var submitBtn = form.querySelector('[type="submit"]');

    if (fields.date) fields.date.min = todayISO();

    function validateField(key) {
      var input = fields[key];
      var rule = VALIDATORS[key];
      if (!input || !rule) return true;
      var message = rule(input.value);
      setFieldError(input, message);
      return !message;
    }

    Object.keys(fields).forEach(function (key) {
      var input = fields[key];
      var liveEvent = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener('blur', function () { validateField(key); });
      input.addEventListener(liveEvent, function () {
        if (input.classList.contains('is-invalid')) validateField(key);
      });
    });

    function resetErrors() {
      Object.keys(fields).forEach(function (key) { setFieldError(fields[key], ''); });
      if (errorBanner) errorBanner.classList.add('hidden');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorBanner) errorBanner.classList.add('hidden');

      var isValid = true;
      var firstInvalid = null;
      Object.keys(fields).forEach(function (key) {
        var ok = validateField(key);
        if (!ok && !firstInvalid) firstInvalid = fields[key];
        isValid = isValid && ok;
      });

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var formData = new FormData();
      formData.append('full_name', fields.name.value.trim());
      formData.append('email', fields.email.value.trim());
      formData.append('phone', fields.phone.value.trim());
      formData.append('treatment_area', fields.treatment.value);
      formData.append('preferred_date', fields.date.value);
      formData.append('preferred_time', fields.time.value);
      formData.append('notes', fields.notes ? fields.notes.value.trim() : '');
      formData.append('form_source', options.formSource || 'website');
      formData.append('website', honeypot ? honeypot.value : '');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }

      fetch('contact_validate.php', {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(function (res) {
          return res.json().catch(function () { return { success: false }; });
        })
        .then(function (data) {
          if (data && data.success) {
            var summary = {
              name: fields.name.value.trim(),
              treatment: fields.treatment.value,
              phone: fields.phone.value.trim()
            };
            form.classList.add('hidden');
            if (successEl) successEl.classList.remove('hidden');
            if (typeof options.onSuccess === 'function') options.onSuccess(summary);
            form.reset();
            resetErrors();
          } else {
            if (errorBanner) {
              errorBanner.textContent = (data && data.message) || 'Unable to submit your request. Please try again later.';
              errorBanner.classList.remove('hidden');
            }
          }
        })
        .catch(function () {
          if (errorBanner) {
            errorBanner.textContent = 'Unable to submit your request. Please try again later.';
            errorBanner.classList.remove('hidden');
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
          }
        });
    });
  }

  window.BracesFormValidation = { init: initBookingForm };

  document.addEventListener('DOMContentLoaded', function () {
    // Contact / Appointment Booking form
    BracesFormValidation.init({
      formId: 'appointment-booking-form',
      fields: {
        name: 'ab-name',
        email: 'ab-email',
        phone: 'ab-phone',
        treatment: 'ab-service',
        date: 'ab-date',
        time: 'ab-time',
        notes: 'ab-notes'
      },
      successId: 'appointment-booking-success',
      errorBannerId: 'ab-form-error',
      honeypotId: 'ab-hp',
      formSource: 'contact',
      onSuccess: function (summary) {
        var nameEl = document.getElementById('ab-success-name');
        if (nameEl) nameEl.textContent = summary.name || 'Patient';
        var waLink = document.getElementById('ab-whatsapp-link');
        if (waLink) {
          var text = 'Hi Clinic, I would like to book an appointment.\nName: ' + summary.name + '\nTreatment: ' + summary.treatment;
          waLink.href = 'https://wa.me/+919876543210?text=' + encodeURIComponent(text);
        }
      }
    });

    // Book Consultation popup
    BracesFormValidation.init({
      formId: 'booking-form',
      fields: {
        name: 'patient-name',
        email: 'patient-email',
        phone: 'patient-phone',
        treatment: 'booking-service-select',
        date: 'booking-date',
        time: 'booking-time',
        notes: 'patient-notes'
      },
      successId: 'booking-success',
      errorBannerId: 'booking-form-error',
      honeypotId: 'booking-hp',
      formSource: 'popup',
      onSuccess: function (summary) {
        var nameEl = document.getElementById('success-patient-name');
        if (nameEl) nameEl.textContent = summary.name || 'Patient';
        var serviceEl = document.getElementById('success-service-name');
        if (serviceEl) serviceEl.textContent = summary.treatment || 'Consultation';
        var waLink = document.getElementById('whatsapp-link');
        if (waLink) {
          waLink.href = 'https://wa.me/+919676328450?text=' + encodeURIComponent('Hi Clinic, I just requested an appointment for ' + summary.name);
        }
      }
    });
  });
})();
