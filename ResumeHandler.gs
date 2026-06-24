// ============================================================
// Reemika's Portfolio — "Let's Connect" Form Handler
// Google Apps Script (.gs)
//
// SETUP INSTRUCTIONS (do this once):
//
// 1. Go to https://script.google.com → New Project
// 2. Paste this entire file into the editor
// 3. Replace the 2 config values below with your own
// 4. Click Deploy → New Deployment → Web App
//      → Execute as: Me
//      → Who has access: Anyone
//      → Click Deploy → Copy the Web App URL
// 5. Paste that URL into your portfolio's index.html
//      → Replace 'YOUR_APPS_SCRIPT_URL_HERE' with it
//
// FIELDS RECEIVED FROM FORM:
//   data.name     — full name
//   data.email    — email address
//   data.role     — role or opportunity they mentioned
//   data.message  — their message
// ============================================================

// ---- CONFIG — update these 2 values ----
var SHEET_ID   = 'YOUR_GOOGLE_SHEET_ID_HERE';  // from the Sheet URL: /d/XXXXXX/edit
var YOUR_EMAIL = 'das.reemika@gmail.com';        // your Gmail address
// -----------------------------------------

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1. Log to Google Sheet
    logToSheet(data);

    // 2. Send acknowledgement to the person who reached out
    sendAcknowledgement(data);

    // 3. Notify Reemika of the new message
    sendNotification(data);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- 1. LOG TO GOOGLE SHEET ----
function logToSheet(data) {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName('Connect Requests') || ss.insertSheet('Connect Requests');

  // Add header row if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Role / Opportunity', 'Message'
    ]);
    // Style the header
    var header = sheet.getRange(1, 1, 1, 5);
    header.setFontWeight('bold');
    header.setBackground('#7C5CBF');
    header.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);  // Timestamp
    sheet.setColumnWidth(2, 160);  // Name
    sheet.setColumnWidth(3, 200);  // Email
    sheet.setColumnWidth(4, 200);  // Role
    sheet.setColumnWidth(5, 360);  // Message
  }

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.role,
    data.message
  ]);
}

// ---- 2. SEND ACKNOWLEDGEMENT TO SENDER ----
function sendAcknowledgement(data) {
  var toEmail = data.email;
  var name    = data.name.split(' ')[0]; // use first name only
  var subject = 'Got your message — Reemika Subrata Das';

  var htmlBody = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2E2440;">

      <div style="background: #7C5CBF; padding: 28px 32px; border-radius: 8px 8px 0 0;">
        <h2 style="margin:0; color:#FAF5FC; font-size:22px; letter-spacing:0.02em;">
          Reemika Subrata Das
        </h2>
        <p style="margin:6px 0 0; color:rgba(255,255,255,0.8); font-size:14px;">
          AI/ML Engineer &amp; Research Assistant
        </p>
      </div>

      <div style="background:#FAF5FC; border:2px solid #EFE9F7; border-top:none;
                  padding:32px; border-radius:0 0 8px 8px;">
        <p style="font-size:16px; margin:0 0 16px;">Hi ${name},</p>

        <p style="font-size:15px; line-height:1.7; margin:0 0 16px; color:#534570;">
          Thanks for reaching out — I've received your message and will get back
          to you shortly. I read every note personally, so expect a real reply,
          not a template.
        </p>

        <div style="background:#EFE9F7; border-radius:8px; padding:20px 24px; margin-bottom:24px;">
          <p style="margin:0 0 10px; font-size:13px; color:#7C5CBF; font-weight:bold;
                    letter-spacing:0.06em; text-transform:uppercase;">Your message summary</p>
          <p style="margin:0 0 6px; font-size:14px; color:#534570;">
            <strong>Role / Opportunity:</strong> ${data.role}
          </p>
          <p style="margin:0; font-size:14px; color:#534570; line-height:1.6;">
            <strong>Message:</strong> ${data.message}
          </p>
        </div>

        <div style="background:#EFE9F7; border-radius:8px; padding:20px 24px; margin-bottom:24px;">
          <p style="margin:0 0 8px; font-size:13px; color:#7C5CBF; font-weight:bold;
                    letter-spacing:0.06em; text-transform:uppercase;">Quick links</p>
          <p style="margin:0; font-size:14px; color:#534570; line-height:1.8;">
            📧 das.reemika@gmail.com<br>
            📞 408-829-7230<br>
            💼 <a href="https://linkedin.com/in/reemikadas"
                 style="color:#7C5CBF;">LinkedIn — reemikadas</a><br>
            💻 <a href="https://github.com/reemikadas"
                 style="color:#7C5CBF;">GitHub — reemikadas</a>
          </p>
        </div>

        <p style="font-size:14px; color:#8A7AAA; margin:0;">
          Talk soon,<br>
          <strong style="color:#2E2440;">Reemika</strong>
        </p>
      </div>

      <p style="font-size:11px; color:#AAA; text-align:center; margin-top:16px;">
        You contacted Reemika via reemika.dev
      </p>

    </div>
  `;

  GmailApp.sendEmail(toEmail, subject, '', {
    name:     'Reemika Subrata Das',
    htmlBody: htmlBody,
    replyTo:  YOUR_EMAIL
  });
}

// ---- 3. NOTIFY REEMIKA OF NEW MESSAGE ----
function sendNotification(data) {
  var subject = '✉️ New portfolio message — ' + data.name + ' (' + data.role + ')';
  var body =
    'New message from your portfolio contact form!\n\n' +
    'Name:              ' + data.name    + '\n' +
    'Email:             ' + data.email   + '\n' +
    'Role/Opportunity:  ' + data.role    + '\n\n' +
    'Message:\n' + data.message          + '\n\n' +
    'Logged to your Google Sheet automatically.';

  GmailApp.sendEmail(YOUR_EMAIL, subject, body);
}

// ---- CORS pre-flight (GET handler) ----
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
