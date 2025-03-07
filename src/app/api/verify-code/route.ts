import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioVerifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

if (!twilioAccountSid || !twilioAuthToken || !twilioVerifyServiceSid) {
  throw new Error("Twilio environment variables are not defined");
}

const client = twilio(twilioAccountSid, twilioAuthToken);

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();

  try {
    const verification_check = await client.verify.services(twilioVerifyServiceSid)
      .verificationChecks
      .create({ to: phone, code });

    return NextResponse.json({ verified: verification_check.status === 'approved' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ verified: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ verified: false, error: "Unknown error" }, { status: 500 });
    }
  }
}