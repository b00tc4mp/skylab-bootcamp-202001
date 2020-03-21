// #include <ESP8266WiFi.h>
// #include <ESP8266WebServer.h>
// #include <Servo.h>

// #define Servo1Pin 14 //D5
// #define Servo2Pin 15 //D8
// #define Servo3Pin 5 //D1
// #define Servo4Pin 2 //D4
// const int LED = 16; //GPI16 - D0

// const char* ssid ="Salasphone";     
// const char* password = "3baefd18e028";        

// Servo servo1;
// Servo servo2;
// Servo servo3;
// Servo servo4;

// ESP8266WebServer server(80);

// void right(){
//   digitalWrite(LED,HIGH);
//   servo1.attach(Servo1Pin);
//   servo2.attach(Servo2Pin);
//   servo3.attach(Servo3Pin);
//   servo4.attach(Servo4Pin);
//   servo1.write(180);
//   servo2.write(180);
//   servo3.write(180);
//   servo4.write(180);
//   server.send(200, "text/plane","trying RIGHT");
// }

// void left(){
//   digitalWrite(LED,HIGH);
//   servo1.attach(Servo1Pin);
//   servo2.attach(Servo2Pin);
//   servo3.attach(Servo3Pin);
//   servo4.attach(Servo4Pin);
//   servo1.write(0);
//   servo2.write(0);
//   servo3.write(0);
//   servo4.write(0);
//   delay(100);
//   server.send(200, "text/plane","trying LEFT");
// }
// void up(){
//   digitalWrite(LED,HIGH);
//   servo1.attach(Servo1Pin);
//   servo2.attach(Servo2Pin);
//   servo3.attach(Servo3Pin);
//   servo4.attach(Servo4Pin);
//   servo1.write(0);
//   servo2.write(0);
//   servo3.write(180);
//   servo4.write(180);
//   delay(100);
//   server.send(200, "text/plane","trying UP");
// }
// void down(){
//   digitalWrite(LED,HIGH);
//   servo1.attach(Servo1Pin);
//   servo2.attach(Servo2Pin);
//   servo3.attach(Servo3Pin);
//   servo4.attach(Servo4Pin);
//   servo1.write(180);
//   servo2.write(180);
//   servo3.write(0);
//   servo4.write(0);
//   delay(100);
//   server.send(200, "text/plane","trying DOWN ");
// }
// void alto(){
//   digitalWrite(LED,HIGH);
//   servo1.detach();
//   servo2.detach();
//   servo3.detach();
//   servo4.detach();
//   delay(100);
//   server.send(200, "text/plane","trying servoStop");
// }

// void no_encontrado() {
//  server.send(404,"text/plain","Error en la petición");
// }

// void setup() {
//   Serial.begin(250000);
//   delay(10);
  
//   pinMode(LED,OUTPUT);
//   digitalWrite(LED,LOW);
  
//   //inicializa el led
//   servo1.attach(Servo1Pin);
//   servo2.attach(Servo2Pin);
//   servo3.attach(Servo3Pin);
//   servo4.attach(Servo4Pin);
  
//   //Inicializa el módulo wifi
//   WiFi.mode(WIFI_STA); 
//   WiFi.disconnect(); 
//   Serial.println();  
  
//   Serial.print("Connecting to ");
//   Serial.println(ssid);
//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {   
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("");
//   Serial.println("WiFi connected");
//   Serial.print("IP address: ");
//   Serial.println(WiFi.localIP());
//   digitalWrite(LED,HIGH);

//   server.on("/up",up);    
//   server.on("/down",down);    
//   server.on("/left",left);    
//   server.on("/right",right);    
//   server.on("/stop",alto);    
  
//   server.onNotFound(no_encontrado);

//   server.begin();
//   Serial.println("Servidor HTTP activo");
// }

// void loop() {
//   server.handleClient();
// }