import { Handler } from '@netlify/functions';

interface CaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export const handler: Handler = async (event) => {
  // CORS headers for all responses
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight requests
  if (String(event.httpMethod) === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only allow POST requests
  if (String(event.httpMethod) !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { token } = JSON.parse(event.body || '{}');

    if (!token) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Missing token' }),
      };
    }

    // Verify the reCAPTCHA token with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Server configuration error' }),
      };
    }

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const verifyResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const captchaResult: CaptchaResponse = await verifyResponse.json();

    if (captchaResult.success) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ success: true }),
      };
    } else {
      console.log('reCAPTCHA verification failed:', captchaResult['error-codes']);
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          error: 'CAPTCHA verification failed',
          details: captchaResult['error-codes'] 
        }),
      };
    }
  } catch (error) {
    console.error('Error verifying CAPTCHA:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to verify CAPTCHA',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
