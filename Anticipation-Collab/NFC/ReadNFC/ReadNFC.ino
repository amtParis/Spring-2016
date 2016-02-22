#include <SPI.h>
#include "PN532_SPI.h"
#include "PN532.h"
#include "NfcAdapter.h"
 
PN532_SPI interface(SPI, 10); // create a PN532 SPI interface with the SPI CS terminal located at digital pin 10
NfcAdapter nfc = NfcAdapter(interface); // create an NFC adapter object
 
void setup(void) {
    Serial.begin(115200); // begin serial communication
    Serial.println("NDEF Reader");
    nfc.begin(); // begin NFC communication
}
 
void loop(void) {

    Serial.println("\nScan an NFC tag\n");
    if (nfc.tagPresent()) // Do an NFC scan to see if an NFC tag is present
    {
        NfcTag tag = nfc.read(); // read the NFC tag into an object, nfc.read() returns an NfcTag object.
        tag.print(); // prints the NFC tags type, UID, and NDEF message (if available)
    }
    delay(500); // wait half a second (500ms) before scanning again (you may increment or decrement the wait time)
}
  
