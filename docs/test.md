---
title: "测试页"
tags: ["animals", "Chicago", "zoos", "中文"]
---

## H2

content

### H3

content

#### H4

content

##### H5

content

###### H6

**bold** *italic* `inlineCode`

inline math: $a^2+b^2=c^2$

math block:

$$
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
$$

```c++
//Code block
#include <cstdio>

void func(){ }
int main() {
    int a,b;
    func();
    cin>>a>>b;
    cout<<a+b;
    return 0;
}
```

!!! warning
    我们平常写的除法是向 0 取整，而这里的右移是向下取整（注意这里的区别），即当数大于等于 0 时两种方法等价，当数小于 0 时会有区别，如： $-1 \div 2 = 0$ , 而 $-1 >> 1 = -1$
 `num * 10 = (num<<1) + (num<<3)` 

???+note 题目
    interactor 随机选择一个 $[1,10^9]$ 范围内的整数，你要写一个程序来猜它，你最多可以询问 $50$ 次一个 $[1,10^9]$ 范围内的整数。
    interactor 将返回：
     `1` ：询问与答案相同，你的程序应当停止询问。
     `0` ：询问比答案小。
     `2` ：询问比答案大。

??? a
    ```c++
    #include <cstdio>
    ```
!!! warning "注"
    注意区分 **基数排序** 与 **桶排序** 

!!! note " 例题[luogu P4322\[JSOI2016\]最佳团体](https://www.luogu.org/problemnew/show/P4322)"
    题目大意：有一棵 $n+1$ 个结点的树，根为 $0$ 号结点。每个结点 $i$ 有一个价值 $p_i$ 和费用 $s_i$ 。你需要选择 $k$ 个结点 $a_1,a_2,\ldots,a_k$ （不包括 $0$ 号结点），使得
    
    $$
    \frac{\sum_{i=1}^k p_{a_i}}{\sum_{i=1}^k s_{a_i}}
    $$
    
    最大。你需要保证对于你选择的一个树上结点，它的父亲一定被选中。求出这个最大的比值。

!!! warning `random_shuffle` 已于 C++14 标准中被弃用，于 C++17 标准中被移除。

> Blockquote
> 
> Blockquote

1. item 1
2. item 2
3. item 3
4. item 4


- A
- B
- C
- D
