import { Mixin } from "./Mixin";
import { css } from "styled-components";

type MixinClass = new (...args: any) => Mixin;

export const mixins = (...mixins: (MixinClass | Mixin)[]) => (
    css`${(props) => mixins.map((mixinDeclaration: MixinClass | Mixin) => {
        const mixin = mixinDeclaration instanceof Mixin ? mixinDeclaration : new mixinDeclaration({ props });

        return mixin.build(props);
    })}`
);
