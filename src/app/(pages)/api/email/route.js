import { emailSubjects } from "@/lib/constants";
import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';
import nodemailer from "nodemailer";

const generateEmailTemplate = (name) => {
    const filePath = path.join(process.cwd(), 'public/templates/download-brochure.html');
    let html = fs.readFileSync(filePath, 'utf8');
    html = html.replace('{{fullName}}', name);
    return html;
};


export async function POST(req) {
    try {
        const body = await req.json();
        const { to, name, attachments } = body;


        const transportConfigs = {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.SMTP_PASSWORD,
            },
        }

        const transporter = nodemailer.createTransport(transportConfigs);
        await transporter.sendMail({
            from: `FuturByte <${process.env.EMAIL_FROM}>`,
            to: to,
            subject: emailSubjects.DOWMLOAD_BROCHURE,
            html: generateEmailTemplate(name),
            attachments
        });

        return NextResponse.json(
            {
                message: 'Email sent successfully!',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: 'Email sent failed',
            },
            { status: 500 }
        );
    }
}