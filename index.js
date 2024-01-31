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

  res.send(getrows.data.values)

  const rows = getrows.data.values
  if (rows && rows.length > 0) {
    // Create a new array and fill it with the second element of each subarray
    const newArray = []
    for (const row of rows) {
      if (row.length > 1) {
        newArray.push(row[1])
      }
    }
    res.send(newArray)
  }

  console.log(rows)

})

app.listen(prt, (req, res) => {
  console.log(`unning on ${prt}"`)
})
