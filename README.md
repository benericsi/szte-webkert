# webkert_projekt
Webfejleszesztési keretrendszerek 2023 - Szőnyeg Webshop Projekt


ng serve futtatása során néha hiba keletkezhet:
"Type 'T' is not assignible to type 'DocumentData'" ..
Ez orvosolható úgy, hogy a node_modules/@angular/fire/compat/firestore/interfaces.d.ts fájlban,
a 15. és 24. sorban a data(options?: SnapshotOptions): -nél a T helyére any-t írunk.

A kosárból való törlés sajnos nem működik az elvártnak megfelelően :,(
Ha kérdésed van: Ricsi#6043 discordon

Köszönöm!
