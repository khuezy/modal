/**
 * 
 * @returns US		Pacific	Canonical	−08:00	−07:00	PST	PDT	northamerica	
US	America/Louisville		Link	−05:00	−04:00	EST	EDT	backward	Link to America/Kentucky/Louisville
SX	America/Lower_Princes
 */

export async function generateStaticParams() {
  return [
    { thing: 'America/Los_Angeles' },
    { thing: 'America/Louisville' },
    { thing: 'America/New_York' }]
}

type Props = {
  params: {
    thing: string
  }
}
export default async function Page({ params }: Props) {
  const bacon = await fetch(`http://worldtimeapi.org/api/timezone/${params.thing}`, {
    next: {

    }
  })
  const data = await bacon.json()
  return <div>
    Dynamic [{params.thing}] {data.datetime}
  </div>
}