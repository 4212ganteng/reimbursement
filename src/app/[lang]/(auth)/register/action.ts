'use server'

export async function registerAction(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const role = formData.get('role')

  console.log({ name, email, password, role })
}
