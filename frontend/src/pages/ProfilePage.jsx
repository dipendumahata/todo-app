import React from 'react'
import ProfileForm from './ProfileForm'

export default function ProfilePage({ token, onProfileSaved }) {
  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>My Profile</h2>
      <ProfileForm token={token} onProfileSaved={onProfileSaved} />
    </div>
  )
}
