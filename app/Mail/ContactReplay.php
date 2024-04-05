<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;


class ContactReplay extends Mailable
{
    use Queueable, SerializesModels;
    public  $email;
    public  $message;
    public  $first_name;
    /**
     * Create a new message instance.
     */
    public function __construct($email, $message, $first_name)
    {
        $this->email = $email;
        $this->message = $message;
        $this->first_name = $first_name;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        // dd($this->email);
        return new Envelope(
            subject: 'Contact Replay',
            from: new Address(config('mail.from.address'), config('app.name')),
            to: $this->email
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.ContactReplay',
            with: ['content' => $this->message]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
