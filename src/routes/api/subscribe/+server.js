import mailchimp from '@mailchimp/mailchimp_marketing';
import { MAILCHIMP_KEY, MAILCHIMP_PREFIX, MAILCHIMP_LIST_ID } from '$env/static/private';

// Initialize Mailchimp
mailchimp.setConfig({
	apiKey: MAILCHIMP_KEY,
	server: MAILCHIMP_PREFIX
});

export async function POST({ request }) {
	console.log({ request });
	try {
		const { email, listId } = await request.json();

		if (!email) {
			return new Response(JSON.stringify({ error: 'Email is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const mailchimpListId = listId || MAILCHIMP_LIST_ID;
		if (!mailchimpListId) {
			return new Response(JSON.stringify({ error: 'List ID is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const response = await mailchimp.lists.addListMember(mailchimpListId, {
			email_address: email,
			status: 'pending' // Use 'pending' to send confirmation email
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Successfully subscribed! Please check your email to confirm.'
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Mailchimp subscription error:', error);

		// Handle specific Mailchimp errors
		if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
			return new Response(
				JSON.stringify({
					error: 'This email is already subscribed to our list.'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({
				error: 'An error occurred while subscribing. Please try again.'
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}
