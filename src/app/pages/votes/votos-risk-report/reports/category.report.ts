import { IRoomModel }  from "src/app/interfaces/i-room.model";
import { EmojisModel } from "../../constants/emojis.model.const";

export class CategoryReport {

    public emojis    = [];
    public whatToDo  = ['🛴', '🚲', '🚗'];
    public hotToMake = ['✨', '🦺', '🧨'];
    public toDevelop = ['🐱‍💻', '👩‍💻', '🔨'];
    public reproduce = ['😄', '🤔', '🤡'];

    constructor(private room: IRoomModel) {
        this.emojis = [...[], ...EmojisModel.map(x => Object.assign({}, x))];
    }

    report() {
        var emojisRoom = this.getEmojisRoom();
        return {
            whatToDo : this.countEmojis(emojisRoom, this.whatToDo),
            hotToMake: this.countEmojis(emojisRoom, this.hotToMake),
            toDevelop: this.countEmojis(emojisRoom, this.toDevelop),
            reproduce: this.countEmojis(emojisRoom, this.reproduce)
        };
    }

    getEmojisRoom() {
        return this.room.votes.map(x => x.value.emojis).reduce((previousValue, currentValue) => [...previousValue, ...currentValue]);
    }

    countEmojis(emojisRoom: string[], category: string[]) {
        var total = emojisRoom.filter(x => category.includes(x)).length;
        return category.map(c => ({
            emoji      : c,
            description: EmojisModel.find(x => x.emoji == c).description,
            quantity   : emojisRoom.filter(x => x == c).length,
            percent    : (emojisRoom.filter(x => x == c).length * 100) / total,
        }));
    }
}