#include <SPI.h>
#include "PN532_SPI.h"
#include "PN532.h"
#include "NfcAdapter.h"

PN532_SPI interface(SPI, 10); // create a SPI interface for the shield with the SPI CS terminal at digital pin 10

NfcAdapter nfc = NfcAdapter(interface); // create an NFC adapter object

void setup(void)
{
  Serial.begin(115200); // start serial comm
  Serial.println("NDEF Reader");
  nfc.begin(); // begin NFC comm
}

void loop(void)
{
  Serial.println("\nScan an NFC tag\n");

  while (!nfc.tagPresent()) { // Wait for a tag
    delay(5);
    return;
  }

  Serial.println("\nNFC tag detected\n");


  NfcTag tag = nfc.read(); // read the NFC tag
  if (tag.hasNdefMessage())
  {
    Serial.println("\nContains a NDEF message\n");

    // Get the message content
    NdefMessage message = tag.getNdefMessage();

    // For each message
    for (int i = 0; i < message.getRecordCount(); i++)
    {
      NdefRecord record = message.getRecord(i);
      if (record.getTnf() == TNF_WELL_KNOWN) {
        Serial.println("\nWell known message\n");
        // Get the length
        int payloadLength = record.getPayloadLength();
        // Prepare something to store the content
        byte payload[payloadLength];
        // Get the content
        record.getPayload(payload);
        // Create a string
        String mydata = "";
        for (int i = 1; i < payloadLength; i++) {
          mydata += (char)payload[i];
        }
        if (payload[0] == 0x1D) {
          Serial.println("\nfile://\n");
          Serial.println(mydata);
        }
        else if (payload[0] == 0x00) {
          Serial.println(mydata);

        }
      }
    }
  }
  // Wait 2 seconds
  delay(2000);
}

