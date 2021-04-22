module.exports = {
    // Function that calc remaining days to finish the job
    remainingDays(job) {
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timerDiffInMs = dueDateInMs - Date.now()

        // Ms in days
        const dayInMs = (1000 * 60) * 60 * 24
        const dayDiff = Math.floor(timerDiffInMs / dayInMs)

        // restam X dias
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}