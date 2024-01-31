const prt = process.env.PORT || 3000
const express = require('express')
const { google } = require('googleapis')
const { sheets } = require('googleapis/build/src/apis/sheets')
const app = express()
app.get('/data', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials_doc.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })
  const client = await auth.getClient()
  const gsheets = google.sheets({ version: 'v4', auth: client })
  const spreadsheetId = '1Gn0UsVq1r8nwn9V2iz6kkJd1TY-48rtZ3M-929Owvhs'
  const metadata = await gsheets.spreadsheets.get({
    spreadsheetId
  })
  const getrows = await gsheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Feuille 1'
  })
 
  /* const writterows = await gsheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'Feuille 1',
    valueInputOption:"USER_ENTERED",
    resource:
    {
       values:[]
    }
    
    
  }) */
  res.send({"row":getrows.data.values})
})

app.listen(prt, (req, res) => {
  console.log(`unning on ${prt}"`)
})
