import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodegeneratorService {
  private usedCodes: Set<string> = new Set<string>();

  generateCode(): string {
    let code = this.randomCode();
    while (this.usedCodes.has(code)) {
      code = this.randomCode();
    }
    this.usedCodes.add(code);
    return code;
  }

  private randomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
