export const list = [
    {
        id: 1,
        isFolder: true,
        title: 'src',
        pid: null,
        fileNameArr: ['src', 'dist', 'package.json', 'README.md'],
        children: [
            {
                id: 7,
                pid: 1,
                isFolder: false,
                fileNameArr: ['index.js', 'index.vue'],
                title: 'index.js'
            },
            {
                id: 8,
                pid: 1,
                isFolder: false,
                fileNameArr: ['index.js', 'index.vue'],
                title: 'index.vue'
            }
        ]
    },
    {
        id: 2,
        isFolder: true,
        title: 'dist',
        pid: null,
        fileNameArr: ['src', 'dist', 'package.json', 'README.md'],
        children: [
            {
                id: 5,
                pid: 2,
                isFolder: false,
                fileNameArr: ['index.html', 'index.js'],
                title: 'index.html'
            },
            {
                id: 6,
                pid: 2,
                isFolder: false,
                fileNameArr: ['index.html', 'index.js'],
                title: 'index.js'
            },

        ]
    },
    {
        id: 3,
        pid: null,
        title: 'package.json',
        fileNameArr: ['src', 'dist', 'package.json', 'README.md'],
        isFolder: false
    }, {
        id: 4,
        pid: null,
        title: 'README.md',
        fileNameArr: ['src', 'dist', 'package.json', 'README.md'],
        isFolder: false
    }
]