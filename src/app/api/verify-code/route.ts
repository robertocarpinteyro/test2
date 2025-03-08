import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioVerifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

if (!twilioAccountSid || !twilioAuthToken || !twilioVerifyServiceSid) {
  throw new Error("Twilio environment variables are not defined");
}

const client = twilio(twilioAccountSid, twilioAuthToken).verify.v2.services(twilioVerifyServiceSid);

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();
  console.log('Received phone number and code:', phone, code);

  try {
    const verificationCheck = await client.verificationChecks.create({ to: phone, code });
    console.log('Verification check result:', verificationCheck.status);

    if (verificationCheck.status === 'approved') {
      return NextResponse.json({ success: true, verified: true });
    } else {
      return NextResponse.json({ success: false, verified: false });
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: "Unknown error" }, { status: 500 });
    }
  }
}