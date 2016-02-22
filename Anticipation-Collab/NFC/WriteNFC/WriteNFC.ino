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
  Serial.println("Place a formatted Mifare Classic NFC tag on the reader.");
  if(nfc.tagPresent())
  {
    NdefMessage message = NdefMessage();
    message.addUriRecord("Hello, world!");
    message.addUriRecord("How are you today?");
    
    bool success = nfc.write(message);
    if(success)
    {
      Serial.println("The message was successfully written to the tag.");
    }else{
      Serial.println("Message write failed.");
    }
  }
  
  delay(5000);
}
