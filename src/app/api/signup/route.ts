export async function POST(request: Request) {
    const body = request.body
    // const {  } = new URL(request.url)
    console.log(body);
    
  return Response.json({status: 'success'})
}