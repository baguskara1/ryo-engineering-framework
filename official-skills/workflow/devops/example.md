# Examples

## Example 1: Terraform AWS EC2 Instance

```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "web-server"
  }
}
```

## Example 2: Ansible Playbook

```yaml
---
- name: Configure web server
  hosts: webservers
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present
      become: yes
    - name: Start Nginx
      service:
        name: nginx
        state: started
        enabled: yes
```
