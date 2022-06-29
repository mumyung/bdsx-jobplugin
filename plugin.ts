import { CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { int32_t } from "bdsx/nativetype";
import * as fs from 'fs'

const SpawnJSON = "spawn.json";
if (fs.existsSync(SpawnJSON) === false) {
    fs.writeFileSync(SpawnJSON, JSON.stringify({}))
}
const SpawnRead = JSON.parse(fs.readFileSync(SpawnJSON, "utf8"))
function saveSpawn() {
    fs.writeFileSync(SpawnJSON, JSON.stringify(SpawnRead), "utf8")
}

command.register("야간투시", "야간투시를 지급 합니다").overload((p, o) => {
    const player = o.getEntity();
    if (player?.isPlayer()) {
        bedrockServer.executeCommand(`effect "${player.getName()}" night_vision 99999 255 true`);
        player.sendMessage("§l§a야간투시를 지급 했습니다")
    }
} , {})

command.register("스폰지정", "스폰을 지정 합니다.", CommandPermissionLevel.Operator).overload((p, o) => {
    const homePos = `${p.x ?? "??"} ${p.y ?? "??"} ${p.z ?? "??"}`;
    SpawnRead["스폰위치"] = `${homePos}`;
    saveSpawn();
}, {
    x: int32_t,
    y: int32_t,
    z: int32_t
})

command.register("스폰", "스폰으로 이동 합니다").overload((pr, o) => {
    const p = o.getEntity();
    if (p?.isPlayer()) {
        bedrockServer.executeCommand(`tp ${p.getName()} ${SpawnRead["스폰위치"]}`);
        p.sendMessage("§l§a스폰으로 이동 했습니다.")
    }
}, {})