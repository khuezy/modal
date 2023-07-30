export default function Modal({ params }: any) {
  return <div>
    {params.title}
    <p style={{ color: 'green' }}>You should see me on modal interception.</p>
  </div>
}