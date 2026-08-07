<?php
/**
 * contact_validate.php
 *
 * Shared backend processor for:
 *   1. The Contact / Appointment Booking form (#appointment-booking-form)
 *   2. The Book Consultation popup (#booking-form)
 *
 * Both forms submit the same field set via AJAX (see js/form-validation.js)
 * to this single endpoint. On success it emails the patient a confirmation
 * and emails the doctor/clinic the appointment request, then returns JSON.
 *
 * Requires the PHPMailer library to be placed at:
 *   PHPMailer/src/PHPMailer.php
 *   PHPMailer/src/SMTP.php
 *   PHPMailer/src/Exception.php
 */

declare(strict_types=1);

// =============================================================================
// 1. CONFIGURATION — edit these values for your mail provider
// =============================================================================
define('SMTP_HOST', 'smtp.yourhost.com');
define('SMTP_USERNAME', 'TheBracesandCrowns@gmail.com');
define('SMTP_PASSWORD', 'your-smtp-password');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');              // 'tls' or 'ssl'
define('FROM_EMAIL', 'TheBracesandCrowns@gmail.com');
define('FROM_NAME', 'THE BRACES & CROWNS');
define('DOCTOR_EMAIL', 'TheBracesandCrowns@gmail.com');

define('CLINIC_NAME', 'THE BRACES & CROWNS');
define('CLINIC_TAGLINE', 'Ameerpet, Hyderabad');
define('CLINIC_PHONE', '+91 97010 04227');

// =============================================================================
// 2. BOOTSTRAP
// =============================================================================
header('Content-Type: application/json; charset=utf-8');

function respond(bool $success, string $message, int $httpCode = 200): void
{
    http_response_code($httpCode);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

function logServerError(string $context, string $error): void
{
    $logDir = __DIR__ . '/logs';
    if (!is_dir($logDir)) {
        @mkdir($logDir, 0755, true);
    }
    $line = '[' . date('Y-m-d H:i:s') . "] {$context}: {$error}" . PHP_EOL;
    @file_put_contents($logDir . '/mail-errors.log', $line, FILE_APPEND);

    $htaccess = $logDir . '/.htaccess';
    if (!file_exists($htaccess)) {
        @file_put_contents($htaccess, "Require all denied\nDeny from all\n");
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Invalid request method.', 405);
}

// -----------------------------------------------------------------------------
// Honeypot spam trap — bots fill hidden fields, real visitors leave it empty.
// Respond as if successful so bots don't learn the trap failed.
// -----------------------------------------------------------------------------
if (!empty($_POST['website'])) {
    respond(true, 'Your appointment request has been submitted successfully.');
}

// =============================================================================
// 3. SANITIZATION
// =============================================================================
function cleanInput(?string $value): string
{
    $value = trim($value ?? '');
    $value = strip_tags($value);
    // Strip CR/LF to prevent email header injection via any field reused in headers.
    $value = preg_replace('/[\r\n]+/', ' ', $value);
    return trim($value);
}

$fullName      = cleanInput($_POST['full_name'] ?? '');
$email         = cleanInput($_POST['email'] ?? '');
$phone         = cleanInput($_POST['phone'] ?? '');
$treatmentArea = cleanInput($_POST['treatment_area'] ?? '');
$preferredDate = cleanInput($_POST['preferred_date'] ?? '');
$preferredTime = cleanInput($_POST['preferred_time'] ?? '');
$notes         = cleanInput($_POST['notes'] ?? '');
$formSource    = cleanInput($_POST['form_source'] ?? 'website');

// =============================================================================
// 4. SERVER-SIDE VALIDATION (mirrors js/form-validation.js)
// =============================================================================
$errors = [];

if (mb_strlen($fullName) < 3) {
    $errors[] = 'Full name must be at least 3 characters.';
}

$email = filter_var($email, FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

$phoneDigits = preg_replace('/\D/', '', $phone);
if (!ctype_digit($phoneDigits) || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15) {
    $errors[] = 'Phone number must be 10-15 digits.';
}

$allowedTreatments = [
    'Orthodontics & Braces',
    'Clear Aligners',
    'Dental Implants',
    'Cosmetic Dentistry',
    'General Dentistry',
    'Smile Makeovers',
];
if ($treatmentArea === '' || !in_array($treatmentArea, $allowedTreatments, true)) {
    $errors[] = 'Please select a valid treatment area.';
}

$today = new DateTime('today');
$dateObj = DateTime::createFromFormat('Y-m-d', $preferredDate);
if (!$dateObj || $dateObj < $today) {
    $errors[] = 'Please choose a valid, future preferred date.';
}

if ($preferredTime === '') {
    $errors[] = 'Please select a preferred time.';
}

if (mb_strlen($notes) > 500) {
    $errors[] = 'Additional notes must be under 500 characters.';
}

if (!empty($errors)) {
    respond(false, implode(' ', $errors), 422);
}

// =============================================================================
// 5. REQUEST METADATA (for the doctor notification email)
// =============================================================================
$submissionTime = date('d M Y, h:i A');
$ipAddress      = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$userAgent      = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
$referrer       = $_SERVER['HTTP_REFERER'] ?? 'Direct';
$scheme         = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$websiteUrl     = $scheme . ($_SERVER['HTTP_HOST'] ?? 'unknown-host');

// =============================================================================
// 6. HTML ESCAPING FOR OUTPUT
// =============================================================================
function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$safeName     = esc($fullName);
$safeEmail    = esc($email);
$safePhone    = esc($phone);
$safeArea     = esc($treatmentArea);
$safeDate     = esc($preferredDate);
$safeTime     = esc($preferredTime);
$safeNotes    = $notes !== '' ? nl2br(esc($notes)) : '<em>None provided</em>';
$safeIp       = esc($ipAddress);
$safeAgent    = esc($userAgent);
$safeReferrer = esc($referrer);
$safeUrl      = esc($websiteUrl);
$safeSubmitted = esc($submissionTime);

// =============================================================================
// 7. EMAIL TEMPLATES
// =============================================================================
function summaryRow(string $label, string $valueHtml, bool $highlight = false): string
{
    $labelStyle = 'padding:10px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#475569;font-weight:600;width:38%;border-bottom:1px solid #D9EAF4;';
    $valueStyle = 'padding:10px 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0B1220;border-bottom:1px solid #D9EAF4;';
    if ($highlight) {
        $valueStyle .= 'background:#EEF8FD;font-weight:700;color:#0B4696;';
    }
    return "<tr><td style=\"{$labelStyle}\">{$label}</td><td style=\"{$valueStyle}\">{$valueHtml}</td></tr>";
}

function emailShell(string $headerTitle, string $bodyHtml): string
{
    $clinicName = esc(CLINIC_NAME);
    $tagline = esc(CLINIC_TAGLINE);
    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>{$clinicName}</title></head>
<body style="margin:0;padding:0;background:#F7FBFE;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7FBFE;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #D9EAF4;">
          <tr>
            <td style="background:#0B4696;padding:28px 32px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#FFFFFF;letter-spacing:0.02em;">{$clinicName}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9FD3F5;margin-top:4px;">{$tagline}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:19px;color:#0B1220;">{$headerTitle}</h1>
              {$bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:#F1F5F9;padding:20px 32px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#475569;">
              &copy; {$clinicName} &middot; {$tagline}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

function buildPatientEmail(string $safeName, string $safeEmail, string $safePhone, string $safeArea, string $safeDate, string $safeTime, string $safeNotes): string
{
    $rows = summaryRow('Full Name', $safeName)
        . summaryRow('Email', $safeEmail)
        . summaryRow('Phone Number', $safePhone)
        . summaryRow('Treatment Area', $safeArea, true)
        . summaryRow('Preferred Date', $safeDate)
        . summaryRow('Preferred Time', $safeTime)
        . summaryRow('Additional Notes', $safeNotes);

    $body = <<<HTML
      <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0B1220;line-height:1.6;">
        Hello {$safeName},<br><br>
        Thank you for contacting <strong>THE BRACES &amp; CROWNS</strong>. We have successfully received your
        appointment request. Our team will contact you shortly to confirm your appointment.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #D9EAF4;border-radius:10px;overflow:hidden;margin:20px 0;">
        {$rows}
      </table>
      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#475569;line-height:1.6;">
        If you need immediate assistance, please call us at
        <a href="tel:+919701004227" style="color:#0B4696;text-decoration:none;font-weight:600;">+91 97010 04227</a>.
      </p>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0B1220;">
        Thank you for choosing THE BRACES &amp; CROWNS.<br>
        Regards,<br>
        <strong>THE BRACES &amp; CROWNS</strong>
      </p>
HTML;

    return emailShell('Appointment Request Received', $body);
}

function buildDoctorEmail(string $safeName, string $safeEmail, string $safePhone, string $safeArea, string $safeDate, string $safeTime, string $safeNotes, string $safeSubmitted, string $safeIp, string $safeAgent, string $safeReferrer, string $safeUrl): string
{
    $rows = summaryRow('Full Name', $safeName)
        . summaryRow('Email', $safeEmail)
        . summaryRow('Phone', $safePhone)
        . summaryRow('Treatment Area', $safeArea, true)
        . summaryRow('Preferred Date', $safeDate)
        . summaryRow('Preferred Time', $safeTime)
        . summaryRow('Additional Notes', $safeNotes)
        . summaryRow('Submission Time', $safeSubmitted)
        . summaryRow('User IP Address', $safeIp)
        . summaryRow('Browser', $safeAgent)
        . summaryRow('Referring Page', $safeReferrer)
        . summaryRow('Website URL', $safeUrl);

    $body = <<<HTML
      <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0B1220;line-height:1.6;">
        A new appointment request has been submitted through the website. Treatment area requested is
        highlighted below.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #D9EAF4;border-radius:10px;overflow:hidden;margin:20px 0;">
        {$rows}
      </table>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#475569;">
        Reply directly to this email to respond to the patient at {$safeEmail}.
      </p>
HTML;

    return emailShell('New Appointment Request', $body);
}

// =============================================================================
// 8. PHPMAILER — SEND BOTH EMAILS
// =============================================================================
$phpMailerDir = __DIR__ . '/PHPMailer/src/';
if (!file_exists($phpMailerDir . 'PHPMailer.php')) {
    logServerError('PHPMailer', 'Library not found at ' . $phpMailerDir . '. Place the PHPMailer/src folder in the project root.');
    respond(false, 'Unable to submit your request. Please try again later.', 500);
}

require_once $phpMailerDir . 'Exception.php';
require_once $phpMailerDir . 'PHPMailer.php';
require_once $phpMailerDir . 'SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

/**
 * @throws PHPMailerException
 */
function buildMailer(): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom(FROM_EMAIL, FROM_NAME);
    return $mail;
}

$patientSent = false;
$doctorSent  = false;

try {
    $patientMail = buildMailer();
    $patientMail->addAddress($email, $fullName);
    $patientMail->isHTML(true);
    $patientMail->Subject = 'Appointment Request Received - ' . CLINIC_NAME;
    $patientMail->Body    = buildPatientEmail($safeName, $safeEmail, $safePhone, $safeArea, $safeDate, $safeTime, $safeNotes);
    $patientMail->AltBody = "Hello {$fullName},\n\nThank you for contacting " . CLINIC_NAME . ". We have received your appointment request and will contact you shortly.\n\nTreatment Area: {$treatmentArea}\nPreferred Date: {$preferredDate}\nPreferred Time: {$preferredTime}";
    $patientMail->send();
    $patientSent = true;
} catch (PHPMailerException $e) {
    logServerError('Patient email', $patientMail->ErrorInfo ?: $e->getMessage());
}

try {
    $doctorMail = buildMailer();
    $doctorMail->addAddress(DOCTOR_EMAIL);
    $doctorMail->addReplyTo($email, $fullName);
    $doctorMail->isHTML(true);
    $doctorMail->Subject = 'New Appointment Request - ' . $treatmentArea;
    $doctorMail->Body    = buildDoctorEmail($safeName, $safeEmail, $safePhone, $safeArea, $safeDate, $safeTime, $safeNotes, $safeSubmitted, $safeIp, $safeAgent, $safeReferrer, $safeUrl);
    $doctorMail->AltBody = "New appointment request from {$fullName} ({$email}, {$phone}) for {$treatmentArea} on {$preferredDate} at {$preferredTime}.";
    $doctorMail->send();
    $doctorSent = true;
} catch (PHPMailerException $e) {
    logServerError('Doctor email', $doctorMail->ErrorInfo ?: $e->getMessage());
}

// =============================================================================
// 9. RESPONSE
// =============================================================================
if ($patientSent || $doctorSent) {
    respond(true, 'Your appointment request has been submitted successfully.');
}

respond(false, 'Unable to submit your request. Please try again later.', 500);
