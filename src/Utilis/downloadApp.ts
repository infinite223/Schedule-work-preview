export const downloadApp = async () => {
    const url = 'https://schedule-work-bi9po30qo-dawids-projects-c0afd572.vercel.app/user/'
    const res = await fetch(`${url}/downloadApp`, {
          method: "GET",    
    })

    return res
}