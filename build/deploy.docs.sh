#!/bin/bash


#说明
show_usage="args:[-c, -v, -h] [--commit=, --version, --help]"

opt_commit=""
opt_version=""

#mac getopt error : brew install gnu-getopt ; export PATH=.
GETOPT_ARGS=`getopt -o c:v:h:: -al commit:,version:help:: -- "$@"`
eval set -- "$GETOPT_ARGS"

#获取参数
while [ -n "$1" ]
    do
        case "$1" in
                -c|--commit) opt_commit=$2; shift 2;;
                -v|--version) opt_version=$2; shift 2;;
                --) break ;;
                *) echo $1,$2,$show_usage; break ;;
        esac
done

# 如果参数为空
if [[ -z $opt_commit || -z $opt_version ]]; then
    echo $show_usage
    echo "opt_commit: $opt_commit , opt_version: $opt_version"
    exit 0
fi

cd ../

mkdir temp-docs

npm run build:docs

cd temp-docs

echo "git clone start..."
git clone https://github.com/chengllNice/chengllNice.github.io.git
echo "git clone end..."

cd chengllNice.github.io/monkey-ui

rm -rf $opt_version

mkdir $opt_version

cd ../../../

mv dist-docs/ temp-docs/chengllNice.github.io/monkey-ui/$opt_version
mv dist-docs/ temp-docs/chengllNice.github.io/monkey-ui

rm -rf dist-docs

cd temp-docs/chengllNice.github.io

echo "git start"

git add .
git commit -m $opt_commit
git pull
git push

echo "git end"

cd ../../

rm -rf temp-docs

echo "end"






