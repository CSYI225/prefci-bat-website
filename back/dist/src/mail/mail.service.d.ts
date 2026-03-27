import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendAdminNotification(devis: any): Promise<void>;
    sendClientConfirmation(devis: any): Promise<void>;
}
