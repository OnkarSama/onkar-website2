import nodemailer from "nodemailer";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    type: string;
}

export async function POST(req: Request): Promise<Response> {
    try {
        const data: ContactFormData = await req.json();
        const { name, email, subject, message, type } = data;

        if (!name || !email || !subject || !message || !type) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
            });
        }

        console.log("Contact Form Data:", data);

        // Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // use app password
            },
        });

        await transporter.sendMail({
            from: `"Website Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `${subject} from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nType of Inquiry: ${type}\n\nMessage:\n${message}`,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err: any) {
        console.error("Email error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}