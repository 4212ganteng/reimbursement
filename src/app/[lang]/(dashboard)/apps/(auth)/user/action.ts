'use server'

export async function RegisterUserAction(formdata: FormData) {
  const FullName = formdata.get('f  ullName')
  const username = formdata.get('username')
  const email = formdata.get('email')
  const password = formdata.get('password')
  const role = formdata.get('role')

  console.log({ FullName, username, email, password, role })
}
