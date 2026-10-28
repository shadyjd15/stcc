// Development SMTP server: accepts every email on :2525 and saves it to ./.mail/*.eml
// (set SMTP_HOST=127.0.0.1 SMTP_PORT=2525 SMTP_SECURITY=none in .env)
import fs from 'fs'
import path from 'path'
import { SMTPServer } from 'smtp-server'
import { simpleParser } from 'mailparser'

const dir = path.resolve('.mail')
fs.mkdirSync(dir, { recursive: true })
const server = new SMTPServer({
  authOptional: true,
  disabledCommands: ['STARTTLS'],
  onData(stream, session, cb) {
    const chunks = []
    stream.on('data', (c) => chunks.push(c))
    stream.on('end', async () => {
      const raw = Buffer.concat(chunks)
      const mail = await simpleParser(raw)
      const file = path.join(dir, `${Date.now()}-${(mail.subject || 'mail').replace(/[^\w]+/g, '-').slice(0, 60)}.eml`)
      fs.writeFileSync(file, raw)
      fs.writeFileSync(file.replace(/\.eml$/, '.html'), mail.html || '')
      console.log(`[mail] to=${mail.to?.text} subject="${mail.subject}"`)
      cb()
    })
  },
})
server.listen(2525, () => console.log('[mail] catcher listening on :2525'))
