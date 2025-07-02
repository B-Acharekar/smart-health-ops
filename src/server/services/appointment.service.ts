import {prisma} from "@/lib/prisma"

export const createAppointment = async(data: any) => {
    return prisma.appointment.create({data})
}

export const getAllAppointments = async() => {
    return prisma.appointment.findMany({
        orderBy: {date:'asc'}
    })
}