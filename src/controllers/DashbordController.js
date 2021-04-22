const Job = require('../model/JobsData')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/ProfileData')

module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // Total de hrs por dia de cada job em progresso
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            // Ajustes no job
            const  remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            // Somando a quantidade de status
            statusCount[status] += 1

            // Total de hrs por dia de cada job em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]) 
            }
        })

        // Calcular horas livres no dia(hrs/dia que quero trabalhar - horas/dia de cada projeto in progress)
        const freeHours = profile["hours-per-day"] - jobTotalHours 

        // manda para o index.ejs o job com info atualizada
        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours})
    }
}

