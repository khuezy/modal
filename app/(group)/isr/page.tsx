
export const revalidate = 300

const ISRPage = async () => {
  const bacon = await fetch('http://worldtimeapi.org/api/timezone/America/Los_Angeles', {
    next: {
      tags: ['bacon']
    }
  })
  const data = await bacon.json()
  return (
    <hgroup>
      <h1>ISR Page</h1>
      <h3>{`Last generated at : ${data.utc_datetime}`}</h3>
    </hgroup>
  )
}

export default ISRPage
