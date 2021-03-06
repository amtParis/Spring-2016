/**
   Read the content of a Mifare Classic NFC tag and increment a counter
   Only the first record found is incremented, if a "well known message"
   Tags shall be formated as NDEF containing a single record set to 0
*/


#include <SPI.h>
#include "PN532_SPI.h"
#include "PN532.h"
#include "NfcAdapter.h"

PN532_SPI interface(SPI, 10); // create a SPI interface for the shield with the SPI CS terminal at digital pin 10

NfcAdapter nfc = NfcAdapter(interface); // create an NFC adapter object

// #define MAX_NDEF_RECO    RDS 500

void setup(void) {
  Serial.begin(115200); // start serial comm
  Serial.println("NDEF Reader");
  nfc.begin(); // begin NFC comm
  Serial.println("\nPlace a Mifare Classic NFC tag on the reader.");
}

void loop(void)  {

  // Wait for a tag.
  // If none, do nothing else
  while (!nfc.tagPresent()) {
    delay(5);
    return;
  }

  NfcTag tag = nfc.read(); // read the NFC tag
  Serial.println("NFC tag detected");

  // Extract and display the NDEF records
  if (tag.hasNdefMessage()) {

    NdefMessage message = tag.getNdefMessage();

    NdefRecord record = message.getRecord(0);

    int recordSize = record.getEncodedSize();
    byte recordTNF = record.getTnf();
    String recordType = record.getType();
    String recordId = record.getId();

    int payloadLength = record.getPayloadLength();
    byte payload[payloadLength];
    record.getPayload(payload);

    Serial.print("Size: ");
    Serial.print(recordSize);
    Serial.println(" bytes");

    // TNF
    Serial.print("TNF: ");

    // We look for a well known message code
    if (recordTNF == TNF_WELL_KNOWN)
      if (recordType == "T") { // T is for text record
        // Get the length
        int payloadLength = record.getPayloadLength();
        // Prepare something to store the content
        byte payload[payloadLength];
        record.getPayload(payload);
        // Get the content
        String s = "";

        // Starts at index 2
        for (int i = 2; i < payloadLength; i++) {
          if (!isDigit(payload[i])) {
            // Display read error
            //break;
          }
          else {
            s += (char)payload[i];
          }
        }
        Serial.print("Value: ");
        Serial.println(s);

        // Convert it to an integer and increment it
        int val = s.toInt();
        Serial.print("Integer value: ");
        Serial.println(val);

        val++;
        Serial.print("Incremented value: ");
        Serial.println(val);

        // Create a record
        NdefMessage message = NdefMessage(); // Create a message container
        message.addTextRecord(String(val)); // Convert it back to string

        // Write it back
        bool success = nfc.write(message); // Write it and get the result (true or false)
        if (success) {
          Serial.println("Tag updated");
        }
        else {
          Serial.println("Tag update failed");
        }
      }
  }
  else {
    Serial.println("No NDEF message found");
  }

  delay(2000); // wait 2 seconds (2000ms) before scanning again (you may increment or decrement the wait time)
  Serial.println("\nScan an NFC tag ...\n");

}
