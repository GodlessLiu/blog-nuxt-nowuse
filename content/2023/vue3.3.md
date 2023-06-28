---
title: vue3.3新特性
date: 2023-06-17
tag: vue3
icon: mdi:vuejs 
description: vue3.3的新特性
---
 

## typescript 支持
- 可以从其他文件里面导入props的类型了,同时也支持d.ts全局导入
  ```ts
  // Hi.ts
  export interface HiProps {
    message: string
  }
  ```
  ```vue
    <!-- Hi.vue -->
    <script setup lang="ts">
    import { HiProps } from '../../types/Hi'
    const props = defineProps<HiProps & { name: string }>()
    console.log(props);
    </script>
    <template>
      <div>
        {{ message }}
        {{ name }}
      </div>
    </template>
  ```
- 通用组件,可以为组件的参数类型定义泛型，不用指定类型啦
  ```vue
  <!-- generic -->
  <script setup lang="ts" generic="T, U extends string">
  const props = defineProps<{
    age: T,
    names: U[]
  }>()
  console.log(props);

  </script>

  <template>
    <div>
    </div>
  </template>

  <!-- APP.vue -->
  <script setup lang="ts">
  // import Hi from './components/Hi.vue'
  import generic from './components/generic.vue';
  </script>
  <!-- <Hi :message="'this is msg'" name="hahahah"></Hi> -->

  <template>
    <div>
      <generic age="10" :names="['m', 'n']"></generic>
    </div>
  </template>
  ```
- defineEmits 可以更简洁的使用`defineEmits`
  *before*
  ```vue
  <script setup lang="ts">
  const emit = defineEmits<{
    (e: 'foo', id: number): void
    (e: 'bar', name: string, ...rest: any[]): void
  }>()
  </script>
  ```

  *now*
  ```vue
  <!-- defineEmits -->
  <script setup lang="ts">
  const emit = defineEmits<{
    foo: [id: number],
    bar: [name: string, age: number]
  }>()
  </script>
  ```
- defineSlots 纯粹的ts类型支持，可以更好的获得slot的类型支持
  ```vue
  <!-- defineSloter -->
  <script setup lang="ts">
  defineSlots<{
    default: (props: { msg: string }) => any,
    foo: (props: { age: number, xingming: string }) => any
  }>()
  </script>

  <template>
    <div>
      <slot msg="hahahaha" name="default" />
      <slot xingming="hahahaha" name="foo" :age="10" />
    </div>
  </template>

  <!-- APP.vue -->
  <template>
    <div>
      <defineSloter>
        <template v-slot="{ msg }">
          <div>
            <br>
            {{ msg }}
            <br>
          </div>
        </template>
        <template v-slot:foo="{ xingming, age }">
          {{ xingming }},{{ age }}
        </template>
      </defineSloter>
    </div>
  </template>
  ```


## 新的一些特性
> 这个我们需要在配置中进行开启
  ``` ts
  // vite.config.ts
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [vue(
      {
        script: {
          propsDestructure: true,
          defineModel: true
        }
      }
    )],
  })
  ```
- 解构props
  ```vue
  <script setup lang="ts">
  import { HiProps } from '../../types/Hi'
  const { name, message } = defineProps<HiProps & { name: string }>()
  console.log(name, message); // 这里的name，message会被自动解构为一个普通的值，但是在底层，他们仍然具有响应式。
  </script>
  ```
- defineModel 更简洁的定义model
  ```vue
  <!-- definmodeler.vue -->
  <script setup lang="ts">

  const bar = defineModel()
  const foo = defineModel("foo", { required: true })

  </script>

  <template>
    <div>
      <span>
        {{ bar }}
      </span>
      <input type="text" v-model="foo">
    </div>
  </template>
  <!-- APP.vue -->
  <defineModeler v-model="bar" v-model:foo="foo"></defineModeler>
  ```
- defineOptions 定义一些option，如name。
  ```vue
  <script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  defineOptions({
    name: "define"
  })
  </script>
  ```
  如果我们不使用的话，默认的name是文件的名字
- toRef 和 toValue
  toRef
  ```ts
  // 定义方式
  // equivalent to ref(1)
  toRef(1)
  // creates a readonly ref that calls the getter on .value access
  toRef(() => props.foo)
  // returns existing refs as-is
  toRef(existingRef)
  ```
  当我们定义了如下的值时
  ```vue
  const foo = ref({age:100})
  <torefandtovalue name="laf" :bar="tt"></torefandtovalue>
  ```
  ```vue
  <!-- torefandtovalue.vue -->
  <script setup lang="ts">
  import { toRef, watchEffect } from 'vue';

  // import { ref, watchEffect } from 'vue';

  const props = defineProps<{
    name: string,
    bar: {
      age: number
    }
  }>()
  useXXX(toRef(props.bar, "age"))
  function useXXX(bar) {
    watchEffect(() => {
      console.log("watch", bar.value);
    })
  }
  </script>
  ```
  这时，当我们修改foo.value.age时，会触发`watchEffect`,但是当我们修改`foo.value = {age:1000}`后，我们再修改foo.value.age时，不会触发`watchEffect`，这里我们就造成了响应式丢失
  解决:
  ```ts
  useXXX(toRef(()=> props.bar.age))
  ```
  toValue
  ```ts
  // 定义方式
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1 // 这里是和unref的区别，unRef(()=> 1) 放回的是一个函数
  ```
  
  [官方blog Announcing Vue 3.3](https://blog.vuejs.org/posts/vue-3-3#typed-slots-with-defineslots)


  
