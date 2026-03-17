// ============================================================
// Google Apps Script — paste this into a new Apps Script project
// It creates a spreadsheet endpoint that accepts POST requests
// from the Airspace Quiz feedback bar.
//
// SETUP (one time, ~2 minutes):
// 1. Go to https://script.google.com
// 2. Click "New Project"
// 3. Delete the default code, paste this entire file
// 4. Click "Deploy" > "New deployment"
// 5. Type: "Web app"
// 6. Execute as: "Me"
// 7. Who has access: "Anyone"
// 8. Click "Deploy" and authorize
// 9. Copy the Web App URL and give it to Claude
// ============================================================

const SHEET_NAME = 'Airspace Quiz Feedback';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet() || createSheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Header row
      sheet.appendRow([
        'Timestamp', 'Player', 'Note', 'Level', 'Level Title',
        'Score', 'Streak', 'Level Correct', 'Level Wrong',
        'Question Type', 'Question Text', 'Correct Answer', 'Attribute',
        'User Agent'
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight('bold');
    }

    const gs = data.gameState || {};
    const q = gs.question || {};

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      gs.player || 'unknown',
      data.note || '',
      gs.level || '',
      gs.levelTitle || '',
      gs.score || 0,
      gs.streak || 0,
      gs.levelCorrect || 0,
      gs.levelWrong || 0,
      q.type || '',
      q.text || '',
      JSON.stringify(q.correct || q.correctSet || ''),
      q.attribute || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function createSheet() {
  return SpreadsheetApp.create('Airspace Quiz Feedback');
}

// Test function — run this manually to verify it works
function testPost() {
  const e = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        note: 'Test from Apps Script',
        gameState: { player: 'Test', level: 1, levelTitle: 'Test Level', score: 0, streak: 0 }
      })
    }
  };
  doPost(e);
}
