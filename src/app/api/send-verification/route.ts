import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioVerifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

if (!twilioAccountSid || !twilioAuthToken || !twilioVerifyServiceSid) {
  throw new Error("Twilio environment variables are not defined");
}

const client = twilio(twilioAccountSid, twilioAuthToken).verify.v2.services(twilioVerifyServiceSid);

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  try {
    const verification = await client.verifications.create({ to: phone, channel: 'sms' });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: "Unknown error" }, { status: 500 });
    }
  }
}