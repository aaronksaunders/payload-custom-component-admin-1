import { Payload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'

// Method 1: Using Drizzle directly
async function getDrizzleUsers(payload: Payload) {
  const users = await payload.db.drizzle.query.users.findMany()
  return groupUsersByTeam(users)
}

// Method 2: Using Payload's local API
async function getPayloadUsers(payload: Payload) {
  const result = await payload.find({
    collection: 'users',
    limit: 1000,
    depth: 0,
  })
  return groupUsersByTeam(result.docs)
}

// Helper function to group users by team
// This is a generic function that can be used with any type of user object
// as long as it has a team property
function groupUsersByTeam<T extends { team?: string | null }>(users: T[]) {
  const usersByTeam = users.reduce(
    (acc, user) => {
      const team = user.team || 'No Team'
      if (!acc[team]) {
        acc[team] = []
      }
      acc[team].push(user)
      return acc
    },
    {} as Record<string, T[]>,
  )

  return {
    users,
    usersByTeam,
  }
}

const BeforeList: React.FC<{ payload: Payload }> = async ({ payload, ...rest }) => {
  // Using Drizzle in this example, but you can switch to getPayloadUsers
  const { users, usersByTeam } = await getDrizzleUsers(payload)

  // Get current team filter from URL
  const headersList = await headers()
  const fullUrl = headersList.get('referer') || ''
  const currentTeam = new URLSearchParams(fullUrl.split('?')[1] || '').get('where[team][equals]')

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
          All ({users.length})
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
