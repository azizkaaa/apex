import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, phone } = await req.json();

        if (!name || !phone) {
            return NextResponse.json({ error: "Missing name or phone" }, { status: 400 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        
        const now = new Date();
        const tashkentOffset = 5 * 60 * 60 * 1000; 
        const tashkentTime = new Date(now.getTime() + tashkentOffset);

        const formattedTime = tashkentTime.getFullYear() + "-" +
                              ("0" + (tashkentTime.getMonth() + 1)).slice(-2) + "-" +
                              ("0" + tashkentTime.getDate()).slice(-2) + " " +
                              ("0" + tashkentTime.getHours()).slice(-2) + ":" +
                              ("0" + tashkentTime.getMinutes()).slice(-2) + ":" +
                              ("0" + tashkentTime.getSeconds()).slice(-2);

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Apex!A:C",
            valueInputOption: "RAW",
            requestBody: {
                values: [[name, phone, formattedTime]], // Вставляем исправленное время
            },
        });

        return NextResponse.json({ message: "Data added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Ошибка при добавлении данных в Google Sheets:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}