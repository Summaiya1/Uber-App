function updateUser(user)
{
  console.log('action called ->', user)
  return {
    type: 'UPDATE_USER', //constant strings
    data: user

  }
}

export {
    updateUser
  }