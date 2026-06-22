// ============================================================
// Reemika's Portfolio — Resume Request Handler
// Google Apps Script (.gs)
//
// SETUP INSTRUCTIONS (do this once):
//
// 1. Go to https://script.google.com → New Project
// 2. Paste this entire file into the editor
// 3. Replace the 3 config values below with your own
// 4. Upload your resume PDF:
//      → In the script editor: click "+" next to Files → Upload
//      → Upload "Reemika_Subrata_Das_Resume.pdf"
// 5. Click Deploy → New Deployment → Web App
//      → Execute as: Me
//      → Who has access: Anyone
//      → Click Deploy → Copy the Web App URL
// 6. Paste that URL into your portfolio's index.html
//      → Replace 'YOUR_APPS_SCRIPT_URL_HERE' with it
// ============================================================

// ---- CONFIG — update these 3 values ----
var SHEET_ID      = 'YOUR_GOOGLE_SHEET_ID_HERE';   // from the Sheet URL: /d/XXXXXX/edit
var YOUR_EMAIL    = 'das.reemika@gmail.com';         // your Gmail address
var RESUME_FILENAME = 'Reemika_Subrata_Das_Resume.pdf'; // must match uploaded file name
// -----------------------------------------

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1. Log to Google Sheet
    logToSheet(data);

    // 2. Send resume to requester
    sendResumeEmail(data);

    // 3. Send you a notification
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

// ---- 1. LOG TO SHEET ----
function logToSheet(data) {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName('Resume Requests') || ss.insertSheet('Resume Requests');

  // Add header row if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'First Name', 'Last Name', 'Full Name',
      'Company', 'Title', 'Email', 'LinkedIn'
    ]);
    // Style the header
    var header = sheet.getRange(1, 1, 1, 8);
    header.setFontWeight('bold');
    header.setBackground('#7C5CBF');
    header.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, 8, 160);
  }

  sheet.appendRow([
    new Date(),
    data.firstName,
    data.lastName,
    data.firstName + ' ' + data.lastName,
    data.company,
    data.title,
    data.email,
    data.linkedin || '—'
  ]);
}

// ---- 2. SEND RESUME TO REQUESTER ----
function sendResumeEmail(data) {
  var firstName = data.firstName;
  var toEmail   = data.email;

  // Get resume PDF from script files
  var files = DriveApp.getFilesByName(RESUME_FILENAME);
  var resumeFile = files.hasNext() ? files.next() : null;

  var subject = 'Reemika Subrata Das — Résumé';

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
        <p style="font-size:16px; margin:0 0 16px;">Hi ${firstName},</p>

        <p style="font-size:15px; line-height:1.7; margin:0 0 16px; color:#534570;">
          Thank you for your interest! Please find my résumé attached — it covers
          my work in <strong>AI/ML engineering</strong>, agentic GenAI systems,
          deep learning, and data analytics.
        </p>

        <p style="font-size:15px; line-height:1.7; margin:0 0 24px; color:#534570;">
          I'd love to connect and learn more about how I can contribute at
          <strong>${data.company}</strong>. Feel free to reach out directly anytime.
        </p>

        <div style="background:#EFE9F7; border-radius:8px; padding:20px 24px; margin-bottom:24px;">
          <p style="margin:0 0 8px; font-size:13px; color:#7C5CBF; font-weight:bold;
                    letter-spacing:0.06em; text-transform:uppercase;">Quick links</p>
          <p style="margin:0; font-size:14px; color:#534570; line-height:1.8;">
            📧 das.reemika@gmail.com<br>
            📞 408-829-7230<br>
            💼 <a href="https://linkedin.com/in/reemika-subrata-das"
                 style="color:#7C5CBF;">LinkedIn Profile</a><br>
            💻 <a href="https://github.com/reemikadas"
                 style="color:#7C5CBF;">GitHub — reemikadas</a>
          </p>
        </div>

        <p style="font-size:14px; color:#8A7AAA; margin:0;">
          Looking forward to connecting,<br>
          <strong style="color:#2E2440;">Reemika</strong>
        </p>
      </div>

      <p style="font-size:11px; color:#AAA; text-align:center; margin-top:16px;">
        You requested this résumé via reemika.dev
      </p>
    </div>
  `;

  var options = {
    name: 'Reemika Subrata Das',
    htmlBody: htmlBody,
    replyTo: YOUR_EMAIL
  };

  if (resumeFile) {
    options.attachments = [resumeFile.getAs(MimeType.PDF)];
  }

  GmailApp.sendEmail(toEmail, subject, '', options);
}

// ---- 3. NOTIFY YOU OF NEW REQUEST ----
function sendNotification(data) {
  var subject = '📬 New résumé request — ' + data.firstName + ' ' + data.lastName + ' @ ' + data.company;
  var body =
    'New résumé request from your portfolio!\n\n' +
    'Name:     ' + data.firstName + ' ' + data.lastName + '\n' +
    'Company:  ' + data.company + '\n' +
    'Title:    ' + data.title + '\n' +
    'Email:    ' + data.email + '\n' +
    'LinkedIn: ' + (data.linkedin || '—') + '\n\n' +
    'Logged to your Google Sheet automatically.';

  GmailApp.sendEmail(YOUR_EMAIL, subject, body);
}

// ---- CORS pre-flight (GET handler) ----
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
