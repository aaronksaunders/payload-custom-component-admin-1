import { Payload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'

const BeforeList: React.FC<{ payload: Payload }> = async ({ payload, ...rest }) => {
  // get drizzle db
  const drizzleDb = payload.db.drizzle
  // can get users like this...
  // rememeber to run `npx payload generate:db-schema
  const drizzleResult = await drizzleDb.query.users.findMany()

  // Get current team filter from URL
  const headersList = await headers()
  const fullUrl = headersList.get('referer') || ''
  const currentTeam = new URLSearchParams(fullUrl.split('?')[1] || '').get('where[team][equals]')

  // Group users by team
  const usersByTeam = drizzleResult.reduce(
    (acc, user) => {
      const team = user.team || 'No Team'
      if (!acc[team]) {
        acc[team] = []
      }
      acc[team].push(user)
      return acc
    },
    {} as Record<string, (typeof drizzleResult)[number][]>,
  )

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    textDecoration: 'none',
    backgroundColor: '#fff',
    color: '#000',
  }

  return (
    <div style={{ margin: 64, border: '1px solid gray', padding: 16 }}>
      <h3>Teams:</h3>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '16px',
          marginTop: '16px',
        }}
      >
        <Link
          href="?"
          style={{
            ...buttonStyle,
            fontWeight: !currentTeam ? 'bold' : 'normal',
          }}
        >
          All ({drizzleResult.length})
        </Link>
        {Object.entries(usersByTeam).map(([team, users]) => (
          <Link
            key={team}
            href={`?where[team][equals]=${encodeURIComponent(team === 'No Team' ? '' : team)}`}
            style={{
              ...buttonStyle,
              fontWeight: currentTeam === (team === 'No Team' ? '' : team) ? 'bold' : 'normal',
            }}
          >
            {team} ({users.length})
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BeforeList
