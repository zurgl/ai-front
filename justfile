_default:
  just --list

#
#
clean:
  rm -rf apps/resume/node_modules
  rm -rf apps/resume/.next/
  rm -rf apps/resume/.turbo/
  rm -rf apps/resume/pnpm-lock.yaml
  rm -rf apps/docs/node_modules
  rm -rf apps/docs/.next/
  rm -rf apps/docs/.turbo/
  rm -rf apps/docs/pnpm-lock.yaml
  rm -rf apps/model/node_modules
  rm -rf apps/model/.next/
  rm -rf apps/model/.turbo/
  rm -rf apps/model/pnpm-lock.yaml
  rm -rf apps/landing/node_modules
  rm -rf apps/landing/.next/
  rm -rf apps/landing/.turbo/
  rm -rf apps/landing/pnpm-lock.yaml
  rm -rf node_modules
  rm -rf pnpm-lock.yaml
  rm -rf packages/eslint-config-custom/node_modules

dev: 
  pnpm dev

https:
  pnpx local-ssl-proxy --config ./ssl/config.json
