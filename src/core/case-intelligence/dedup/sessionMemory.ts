export class SessionDedupMemory {
  public usedReportSentenceFingerprints: string[] = [];
  public usedRecognitionLineFingerprints: string[] = [];
  public usedOpeningPatterns: string[] = [];
  public usedTemplateFamilies: string[] = [];

  recordReportSentence(fingerprint: string) {
    if (!this.usedReportSentenceFingerprints.includes(fingerprint)) {
      this.usedReportSentenceFingerprints.push(fingerprint);
    }
  }

  recordRecognitionLine(fingerprint: string, templateFamily?: string) {
    if (!this.usedRecognitionLineFingerprints.includes(fingerprint)) {
      this.usedRecognitionLineFingerprints.push(fingerprint);
    }
    if (templateFamily && !this.usedTemplateFamilies.includes(templateFamily)) {
      this.usedTemplateFamilies.push(templateFamily);
    }
  }

  recordOpeningPattern(fingerprint: string) {
    if (!this.usedOpeningPatterns.includes(fingerprint)) {
      this.usedOpeningPatterns.push(fingerprint);
    }
  }

  clear() {
    this.usedReportSentenceFingerprints = [];
    this.usedRecognitionLineFingerprints = [];
    this.usedOpeningPatterns = [];
    this.usedTemplateFamilies = [];
  }
}
