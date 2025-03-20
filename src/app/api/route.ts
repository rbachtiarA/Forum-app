export const dynamic = 'force-static'
 
export async function GET() {
    const data = {
      name: 'Kriibo-app'
    }
 
  return Response.json(data)
}