import { Injectable } from "@nestjs/common";
import { createCipheriv, randomBytes, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class SecurityProvider {
    async encrypt(str: string) {
        const iv = randomBytes(16);

        // The key length is dependent on the algorithm.
        // In this case for aes256, it is 32 bytes.
        const key = (await promisify(scrypt)(str, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const textToEncrypt = 'Nest';
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
    }

    async descrypt(str: string, textToEncrypt) {
        const iv = randomBytes(16);
        const key = (await promisify(scrypt)(str, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        const decryptedText = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);
    }
}