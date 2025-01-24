export const dynamic = 'force-static'
 
export async function GET() {
    const data = [
        {name: 'Ryan', email: 'ryan@example.mail'}
    ]
 
  return Response.json(data)
}