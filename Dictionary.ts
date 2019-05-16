class Dictionary<TKey, TValue>{
    private _keys: TKey[] = [];
    private _values: TValue[] = [];

    get keys(): TKey[] {
        //TODO:后期改为只读
        return this._keys;
    }

    get values(): TValue[] {
        return this._values;
    }

    add(key: TKey, value: TValue): void {
        this._keys.push(key);
        this._values.push(value)
    }

    update(key: TKey, value: TValue): boolean {
        let index = this._keys.indexOf(key, 0);
        if (index > -1) {
            this._values[index] = value;
            return true;
        }
        return false;
    }

    addOrUpdate(key: TKey, newValue: TValue, func: (key: TKey, oldValue: TValue) => TValue): void {
        let result = this.tryGetValue(key);
        if (result[0]) {
            let value = func(key, result[1]);
            this.update(key, value);
        } else {
            this.add(key, newValue);
        }

    }

    remove(key: TKey): void {
        let index = this._keys.indexOf(key, 0);
        if (index > -1) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
        }
    }

    tryGetValue(key: TKey): [boolean, TValue | undefined] {
        let index = this._keys.indexOf(key, 0);
        let value: TValue | undefined = undefined;
        let exist = index > -1;
        if (exist) {
            value = this._values[index];
        }
        return [exist, value];
    }

    containsKey(key: TKey): boolean {
        let index = this._keys.indexOf(key, 0);
        return index > -1;
    }

}