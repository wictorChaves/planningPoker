import { IRoomModel } from "src/app/interfaces/i-room.model";
import { EmojisModel } from "../../constants/emojis.model.const";

export class GeneralReport {

    public emojis: any[] = [];

    constructor(private room?: IRoomModel) {
        this.emojis = [...[], ...EmojisModel.map(x => Object.assign({}, x))];
    }

    report() {
        var emojisRoom = this.getEmojisRoom();
        this.countEmojis(emojisRoom);

        var total = this.getQuantityTotal();

        return this.emojis.filter(x => x.quantity > 0).map(x => ({
            emoji: x.emoji,
            description: x.description,
            quantity: x.quantity,
            percent: (x.quantity * 100) / total
        }));
    }

    getEmojisRoom() {
        var emojisRoom = this.room?.votes
            ?.map(x => x?.value?.emojis)
            .reduce((previousValue, currentValue) => [...previousValue ?? [], ...currentValue ?? []], []);
        return emojisRoom ?? [];
    }

    countEmojis(emojisRoom: any) {
        emojisRoom.forEach((emojiRoom: any) => {
            var emoji = this.emojis.find(x => x.emoji == emojiRoom);
            if (!emoji.quantity) emoji['quantity'] = 0;
            emoji.quantity++;
        });
    }

    getQuantityTotal() {
        return this.emojis.filter(x => x.quantity > 0).map(x => x.quantity).reduce((previousValue, currentValue) => previousValue + currentValue);
    }
}